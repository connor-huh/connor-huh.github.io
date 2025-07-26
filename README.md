
date: 2025-07-25
categories: [projects, automation, taylor-swift]
---

# Beating Swiftle with Python and PyAutoGUI

## Introduction
If you know anything about me, you probably know I've listened to my fair share of Taylor Swift. In 2023 alone, I accumulated over 1100 hours of her music on Spotify, contributing to more than 80% of my total listening time. Over 250 of these hours were spent solely listening to _All Too Well (10 Minute Version) (Taylor's Version)_. This level of commitment landed me in the top 0.01% of Taylor Swift listeners globally. I was even able to see her perform live during the _Era's Tour_ earlier that year.

My obsession with Swift's music began through imitation. Growing up, I always looked up to my sister, whose interests were my blueprint. When she became enchanted by Taylor Swift, I followed suit. By eighth grade, many knowledge of her songs became a sort of social currency, and many of my friendships stemmed from a shared love for her music. It even led to a Taylor Swift-centric group chat that persists today, despite my switching schools for ninth grade.

Given this, you'd expect me to be good at Swiftle Rapid, the Taylor Swift-themed variant of Heardle (itself an audio-based riff on Wordle). But strangely enough, I'm awful at it. Often, I recognize the melody, but my mind becomes a blank space when grasping for its title. Other times, I'm unfamiliar with the song entirely. Though I've listened to her entire catalog before, my listening habits are heavily skewed toward my favorites, leaving a vast number of tracks almost untouched. I know the lyrics to many of her songs by heart; it's just not always the right ones. While some of my friends have streaks well into the triple digits, it took me multiple tries just to break a streak of five.

Not exactly a great look for a top 0.01% Taylor Swift fan...

Ever since I learned how pitiful I was at this game, I've dreamed of writing a program that could beat the game for me. Over the past few days, I finally brought my wildest dream to life.

The pipeline was conceptually simple:
1. Capture the audio snippet from Swiftle.
2. Use a music recognition API to identify the song.
3. Click the search bar, type the answer, and hit Enter.

I hoped to automate the process entirely, meaning I could let the script run in the background without monitoring it. 

## The Build
Despite the apparent simplicity of the idea, actually building it involved a decent amount of debugging and domain-specific adjustments. I knew it would rely significantly on external packages, most of which I have no knowledge of. Thus, a large portion of my preliminary work was searching for packages online that could contribute to my script.

The first step was to figure out how to record the Swiftle audio snippet automatically. I used sounddevice to capture audio from my computer. To capture internal audio on my Macbook, I installed a virtual input device called BlackHole. After selecting the correct device index in Python, I was ready to record.

```python
def record_audio(filename='snippet.wav'):
    recording = sd.rec(int(DURATION * FS), samplerate=FS, channels=2, device=DEVICE_INDEX)
    sd.wait()
    write(filename, FS, recording)
```

Swiftle plays about 1 second of audio on the first guess, increasing with each attempt. I record about 2.5 seconds to cover the full snippet. I considered writing logic to wait for the snippet to finish playing before recording, but Swiftle’s timing is erratic and browser-dependent. In practice, just recording a constant slice proved more reliable.
