import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize2, Radio } from 'lucide-react';
import { Episode } from '../types';

interface AudioPlayerProps {
  currentEpisode: Episode;
  onSelectEpisode?: (episode: Episode) => void;
  onOpenNotes?: () => void;
  compact?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  currentEpisode,
  onOpenNotes,
  compact = false,
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(currentEpisode.durationSeconds || 1800);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [volume, setVolume] = useState<number>(0.85);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Audio Context Ref for synthetic tone generation
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);

  // Sync duration on episode change
  useEffect(() => {
    setDuration(currentEpisode.durationSeconds);
    setCurrentTime(0);
    setIsPlaying(false);
  }, [currentEpisode]);

  // Audio synthesis for live tech ambiance
  useEffect(() => {
    if (isPlaying) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current && AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        if (audioCtxRef.current && !oscRef.current) {
          const ctx = audioCtxRef.current;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          // Subtle warm mechanical HVAC frequency tone (48Hz low rumble + subtle modulation)
          osc.type = 'sine';
          osc.frequency.setValueAtTime(55, ctx.currentTime);
          
          gain.gain.setValueAtTime(isMuted ? 0 : volume * 0.05, ctx.currentTime);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          
          oscRef.current = osc;
          gainNodeRef.current = gain;
        } else if (gainNodeRef.current && audioCtxRef.current) {
          gainNodeRef.current.gain.setValueAtTime(isMuted ? 0 : volume * 0.05, audioCtxRef.current.currentTime);
        }
      } catch {
        // Fallback silently if audio context is restricted
      }

      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1 * playbackRate;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch {
          // ignore
        }
        oscRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (oscRef.current) {
        try {
          oscRef.current.stop();
          oscRef.current.disconnect();
        } catch {
          // ignore
        }
        oscRef.current = null;
      }
    };
  }, [isPlaying, playbackRate, duration, volume, isMuted]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const seekRelative = (seconds: number) => {
    setCurrentTime((prev) => Math.max(0, Math.min(duration, prev + seconds)));
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  const cyclePlaybackRate = () => {
    const rates = [1, 1.25, 1.5, 2];
    const nextIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    setPlaybackRate(rates[nextIndex]);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Generate 48 waveform bars
  const waveformBars = [
    25, 40, 65, 30, 85, 45, 95, 70, 50, 35, 80, 60, 45, 90, 100, 75,
    30, 40, 60, 85, 90, 70, 50, 65, 80, 95, 40, 30, 75, 85, 60, 90,
    55, 35, 70, 85, 45, 60, 95, 80, 50, 40, 65, 80, 45, 30, 50, 40
  ];

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (compact) {
    return (
      <div className="bg-[#181f24] border border-[#243038] rounded-xl p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-lg bg-[#F5A623] hover:bg-[#e0951b] text-black flex items-center justify-center shrink-0 transition-transform active:scale-95 cursor-pointer"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-black" /> : <Play className="w-5 h-5 fill-black ml-0.5" />}
          </button>
          <div className="min-w-0">
            <div className="text-xs text-slate-400 font-mono">
              Ep. {currentEpisode.number} · {currentEpisode.category}
            </div>
            <div className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
              {currentEpisode.title}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={cyclePlaybackRate}
            className="px-2 py-1 text-xs font-mono font-medium text-slate-300 bg-[#222a30] hover:bg-[#2b353e] rounded transition-colors"
          >
            {playbackRate}x
          </button>
          {onOpenNotes && (
            <button
              onClick={onOpenNotes}
              className="p-1.5 text-slate-400 hover:text-white transition-colors"
              title="View Show Notes"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#181f24] border border-[#243038] rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Top Meta Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#243038]/70">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Radio className="w-3.5 h-3.5 text-[#F5A623]" />
          <span className="font-semibold text-[#F5A623]">Field Diary Podcast</span>
          <span aria-hidden="true">·</span>
          <span>Episode {currentEpisode.number}</span>
          <span aria-hidden="true">·</span>
          <span>{currentEpisode.date}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>{currentEpisode.category}</span>
          {currentEpisode.ambientConditions && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-amber-300/80 hidden sm:inline">{currentEpisode.ambientConditions}</span>
            </>
          )}
        </div>
      </div>

      {/* Episode Title & Preview */}
      <div className="mb-6">
        <h3 className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug">
          {currentEpisode.title}
        </h3>
        <p className="text-sm text-slate-300 line-clamp-2 leading-relaxed">
          {currentEpisode.summary}
        </p>
      </div>

      {/* Waveform Visualization */}
      <div className="mb-5 bg-[#121619] rounded-xl p-3 border border-[#222a30]">
        <div className="flex items-center justify-between gap-1 h-14 px-1">
          {waveformBars.map((barHeight, idx) => {
            const barProgress = (idx / waveformBars.length) * 100;
            const isPlayed = barProgress <= progressPercent;
            const dynamicScale = isPlaying
              ? Math.sin(idx * 0.4 + currentTime * 3) * 15 + barHeight
              : barHeight;
            const clampedHeight = Math.max(15, Math.min(100, dynamicScale));

            return (
              <div
                key={idx}
                onClick={() => {
                  const targetSec = (idx / waveformBars.length) * duration;
                  setCurrentTime(targetSec);
                }}
                className="flex-1 h-full flex items-center justify-center cursor-pointer group"
                title={`Seek to ${formatTime((idx / waveformBars.length) * duration)}`}
              >
                <div
                  className={`w-full max-w-[4px] rounded-full transition-all duration-150 ${
                    isPlayed
                      ? 'bg-[#F5A623] group-hover:bg-amber-300'
                      : 'bg-[#2b353e] group-hover:bg-slate-500'
                  }`}
                  style={{ height: `${clampedHeight}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* Scrub Slider */}
        <div className="mt-2 flex items-center gap-3">
          <span className="text-xs font-mono text-slate-400 tabular-nums w-10 text-right">
            {formatTime(currentTime)}
          </span>
          <div className="relative flex-1 flex items-center">
            <input
              type="range"
              min="0"
              max={duration}
              value={currentTime}
              onChange={handleScrub}
              className="w-full h-1.5 bg-[#243038] rounded-lg appearance-none cursor-pointer accent-[#F5A623]"
              aria-label="Audio scrubber"
            />
          </div>
          <span className="text-xs font-mono text-slate-400 tabular-nums w-10">
            {formatTime(duration)}
          </span>
        </div>
      </div>

      {/* Playback Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Play/Pause & Skips */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => seekRelative(-15)}
            className="p-2 text-slate-400 hover:text-white hover:bg-[#222a30] rounded-lg transition-colors cursor-pointer"
            title="Rewind 15 seconds"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-xl bg-[#F5A623] hover:bg-[#e0951b] active:scale-95 text-black flex items-center justify-center font-bold transition-all shadow-md cursor-pointer"
            aria-label={isPlaying ? 'Pause Episode' : 'Play Episode'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-black" />
            ) : (
              <Play className="w-6 h-6 fill-black ml-0.5" />
            )}
          </button>

          <button
            onClick={() => seekRelative(30)}
            className="p-2 text-slate-400 hover:text-white hover:bg-[#222a30] rounded-lg transition-colors cursor-pointer"
            title="Fast forward 30 seconds"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <div className="text-xs text-slate-400 pl-2 hidden sm:block">
            {isPlaying ? (
              <span className="text-[#F5A623] font-mono">Streaming Field Audio</span>
            ) : (
              <span>Field Audio Ready</span>
            )}
          </div>
        </div>

        {/* Speed, Volume, and Notes */}
        <div className="flex items-center gap-3">
          <button
            onClick={cyclePlaybackRate}
            className="px-2.5 py-1 text-xs font-mono font-semibold text-slate-200 bg-[#222a30] hover:bg-[#2b353e] hover:text-[#F5A623] rounded-md transition-colors cursor-pointer"
            title="Change Playback Speed"
          >
            {playbackRate}x
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(Number(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-16 h-1 bg-[#243038] rounded appearance-none cursor-pointer accent-[#F5A623]"
              aria-label="Volume"
            />
          </div>

          {onOpenNotes && (
            <button
              onClick={onOpenNotes}
              className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-[#222a30] hover:bg-[#2b353e] hover:text-[#F5A623] rounded-md transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Show Notes</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
