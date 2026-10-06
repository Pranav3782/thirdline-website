import { scenes } from "./content";
import voiceover from "./voiceover.json";

export type VoiceClip = { src: string; duration: number };

export type Beat = {
  sceneIndex: number;
  lineIndex: number;
  text: string;
  start: number;
  /** Time the beat holds the screen, including the pause after the line. */
  duration: number;
  /** How long the line is actually spoken; captions end here. */
  spoken: number;
  audio?: VoiceClip;
};

const LINE_PAUSE = 0.5;
const SCENE_PAUSE = 0.8;
const DRAMATIC_PAUSE = 1.8;
const WORDS_PER_SECOND = 2.6;

const clips = voiceover.lines as Record<string, VoiceClip>;

function estimate(text: string) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1.2, words / WORDS_PER_SECOND);
}

export function buildTimeline(): { beats: Beat[]; total: number } {
  const beats: Beat[] = [];
  let t = 0;
  scenes.forEach((scene, sceneIndex) => {
    scene.voiceover.forEach((text, lineIndex) => {
      const lastInScene = lineIndex === scene.voiceover.length - 1;
      const pause = lastInScene ? SCENE_PAUSE : LINE_PAUSE;
      if (text.trim() === "…") {
        beats.push({ sceneIndex, lineIndex, text, start: t, duration: DRAMATIC_PAUSE, spoken: 0 });
        t += DRAMATIC_PAUSE;
        return;
      }
      const audio = clips[`${sceneIndex}-${lineIndex}`];
      const spoken = audio?.duration ?? estimate(text);
      beats.push({ sceneIndex, lineIndex, text, start: t, duration: spoken + pause, spoken, audio });
      t += spoken + pause;
    });
  });
  return { beats, total: t };
}
