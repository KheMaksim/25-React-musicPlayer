import { useState, useRef, ChangeEvent, useEffect } from 'react';
import tracksList from '../../helpers/trackList';
import formatTime from '../../helpers/formatTime';
import btnLink from '../../helpers/btnLink';
import './MusicPlayer.css'
import Button from '../../components/UI/Button/Button';
import TrackBar from '../../components/TrackBar/TrackBar';

const MusicPlayer = () => {
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
		if (progressRef.current) progressRef.current.style.width = '0%';
	};

	const prevTrackHandler = (): void => {
		currentTrackIndex > 0 ? setCurrentTrackIndex(currentTrackIndex - 1) : setCurrentTrackIndex(tracks.length - 1);
		if (progressRef.current) progressRef.current.style.width = '0%';
	};

	useEffect(() => {
		if (currentTime === duration && duration !== 0) {
			nextTrackHandler();
		}
	}, [currentTime, duration])

	return (
		<div className="player__wrapper">
			<div className='player__container'>
				<h1 className='player__title'>React <img className='player__logo' src="https://icons-for-free.com/iconfiles/png/512/logo+react+react+js+icon-1320184811840217251.png" alt="logo" /> Music
				</h1>
				<TrackBar src={tracks[currentTrackIndex].imageSrc}
					name={tracks[currentTrackIndex].name}
					author={tracks[currentTrackIndex].name}
					timecode={formatTime(currentTime)}
					progressRef={progressRef}
					durationCode={isNaN(duration) ? "00:00" : formatTime(duration)}
					audioRef={audioEl}
					audioSrc={tracks[currentTrackIndex].src}
					onTimeUpdate={onTimeUpdateHandler}
					autoPlay={playing} />
				<div className="buttons">
					<Button type='prev' onClickHandler={prevTrackHandler} src="https://cdn.icon-icons.com/icons2/741/PNG/512/back_icon-icons.com_63358.png" />
					{playing ?
						(<Button type='pause' onClickHandler={onPauseHandler} src={btnLink} />) :
						(<Button type='play' onClickHandler={onPlayHandler} src={btnLink} text='Play' />)
					}
					<Button type='next' onClickHandler={nextTrackHandler} src='https://cdn.icon-icons.com/icons2/741/PNG/512/next_icon-icons.com_63384.png' />
				</div>
			</div>
		</div>
	);
};

export default MusicPlayer;