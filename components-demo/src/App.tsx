import { useState, useRef, ChangeEvent, useEffect } from 'react';
import './css/App.css';
import tracksList from './helpers/trackList';
import formatTime from './helpers/formatTime';
import btnLink from './helpers/btnLink';

const Player = () => {
	const [tracks] = useState(tracksList);
	const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);
	const [playing, setPlaying] = useState(false);
	const audioEl = useRef<HTMLAudioElement>(null);
	const progressRef = useRef<HTMLDivElement>(null);
	const updateProgress = (width: number): void => {
		if (width >= 100 || !playing) return;
		width++;
		if (progressRef.current) progressRef.current.style.width = width + "%";
		setTimeout(updateProgress, duration / 100 * 1000);
	};
	const onTimeUpdateHandler = (e: ChangeEvent<HTMLAudioElement>): void => {
		const audioElement = e.target;
		setCurrentTime(Math.floor(audioElement.currentTime));
		setDuration(Math.floor(audioElement.duration));
		if (progressRef.current) {
			const progress = Math.floor((audioElement.currentTime / audioElement.duration) * 100);
			if (isNaN(progress) === true) {
				progressRef.current.style.width = 0 + "%";
				return
			}
			progressRef.current.style.width = progress + "%";
		}
	};
	const onPlayHandler = (): void => {
		let width = 0;
		const playerEl = audioEl.current;
		if (playerEl) {
			setPlaying(true);
			playerEl.play();
			updateProgress(width);
		}
	};

	const onPauseHandler = (): void => {
		const playerEl = audioEl.current;
		if (playerEl) {
			setPlaying(false);
			playerEl.pause();
		}
	};

	const nextTrackHandler = (): void => {
		currentTrackIndex < tracks.length - 1 ? setCurrentTrackIndex(currentTrackIndex + 1) : setCurrentTrackIndex(0);
		setPlaying(false);
		if (progressRef.current) progressRef.current.style.width = '0%';
		setPlaying(true);
	};

	const prevTrackHandler = (): void => {
		currentTrackIndex > 0 ? setCurrentTrackIndex(currentTrackIndex - 1) : setCurrentTrackIndex(tracks.length - 1);
		setPlaying(false);
		if (progressRef.current) progressRef.current.style.width = '0%';
		setPlaying(true);
	};

	useEffect(() => {
		if (currentTime === duration && duration !== 0) {
			nextTrackHandler();
		}
	}, [currentTime, duration])

	return (
		<div className='container'>
			<h1>React <img className='logo' src="https://icons-for-free.com/iconfiles/png/512/logo+react+react+js+icon-1320184811840217251.png" alt="" /> Music</h1>
			<div>
				<img className='track__image' src={tracks[currentTrackIndex].imageSrc} />
				<h2 className='track__name'>{tracks[currentTrackIndex].name}</h2>
				<p className='track__author'>{tracks[currentTrackIndex].author}</p>
				<div className="bar">
					<p className="bar__timecode">{formatTime(currentTime)}</p>
					<div id="progress">
						<div id="greenProgress" ref={progressRef}></div>
					</div>
					<p className="bar__timecode">{isNaN(duration) ? "00:00" : formatTime(duration)}</p>
					<audio ref={audioEl}
						src={tracks[currentTrackIndex].src}
						onTimeUpdate={onTimeUpdateHandler}
						onCanPlay={(e: ChangeEvent<HTMLAudioElement>): void => {
							e.target.play()
						}} />
				</div>
			</div>
			<div className="buttons">
				<button className="btn prev" onClick={prevTrackHandler}>
					<img className='btn__image' src="https://cdn.icon-icons.com/icons2/741/PNG/512/back_icon-icons.com_63358.png" />
				</button>
				{playing ? (<button className="btn pause" onClick={onPauseHandler}>
					<img className='btn__image' src={btnLink} />
				</button>) : (<button className="btn play" onClick={onPlayHandler}>
					<img className='btn__image' src={btnLink} />
					Play
				</button>)}
				<button className="btn next" onClick={nextTrackHandler}>
					<img className='btn__image' src="https://cdn.icon-icons.com/icons2/741/PNG/512/next_icon-icons.com_63384.png" />
				</button>
			</div>
		</div>
	);
};

const App = () => {
	return (
		<>
			<Player />
		</>
	)
}

export default App