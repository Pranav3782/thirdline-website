// Renders text to audio files with the system voices (including Siri neural voices).
// Usage: swift scripts/speak.swift <jobs.json>
// jobs.json: [{ "voice": "<voice identifier>", "text": "...", "out": "/abs/path.caf", "rate": 0.5 }]
// Must run through the `swift` interpreter: compiled binaries cannot see the Siri voices.
import AVFoundation

struct Job: Decodable {
  let voice: String
  let text: String
  let out: String
  let rate: Float?
}

func fail(_ message: String) -> Never {
  FileHandle.standardError.write((message + "\n").data(using: .utf8)!)
  exit(1)
}

guard CommandLine.arguments.count == 2,
      let data = FileManager.default.contents(atPath: CommandLine.arguments[1]),
      let jobs = try? JSONDecoder().decode([Job].self, from: data)
else { fail("usage: swift speak.swift <jobs.json>") }

let voices = Dictionary(
  AVSpeechSynthesisVoice.speechVoices().map { ($0.identifier, $0) },
  uniquingKeysWith: { first, _ in first }
)
let synth = AVSpeechSynthesizer()

for job in jobs {
  guard let voice = voices[job.voice] else { fail("voice not installed: \(job.voice)") }
  let utterance = AVSpeechUtterance(string: job.text)
  utterance.voice = voice
  if let rate = job.rate { utterance.rate = rate }

  var file: AVAudioFile?
  var frames: AVAudioFrameCount = 0
  var finished = false

  synth.write(utterance) { buffer in
    guard let pcm = buffer as? AVAudioPCMBuffer else { return }
    if pcm.frameLength == 0 {
      finished = true
      return
    }
    do {
      if file == nil {
        file = try AVAudioFile(
          forWriting: URL(fileURLWithPath: job.out), settings: pcm.format.settings,
          commonFormat: pcm.format.commonFormat, interleaved: pcm.format.isInterleaved)
      }
      try file?.write(from: pcm)
      frames += pcm.frameLength
    } catch {
      fail("write failed for \(job.out): \(error)")
    }
  }

  let deadline = Date().addingTimeInterval(60)
  while !finished && Date() < deadline {
    RunLoop.main.run(until: Date().addingTimeInterval(0.02))
  }
  file = nil
  if frames == 0 { fail("no audio produced for: \(job.text)") }
  print(job.out)
}
