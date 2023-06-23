import { ChangeEvent, LegacyRef } from 'react';
import './TrackBar.css'

interface Props {
	src: string;
	name: string;
	author: string;
	timecode: string;
	progressRef: LegacyRef<HTMLDivElement> | undefined;
	durationCode: string;
	audioRef: LegacyRef<HTMLAudioElement> | undefined;
	audioSrc: string;
	onTimeUpdate: (e: ChangeEvent<HTMLAudioElement>) => void;
	autoPlay: boolean;
}

const TrackBar = ({ src, name, author, timecode, progressRef, durationCode, audioRef, audioSrc, onTimeUpdate, autoPlay }: Props) => {
	return (
		<div className='track'>
			<img className='track__image' src={src} />
			<h2 className='track__name'>{name}</h2>
			<p className='track__author'>{author}</p>
			<div className="track__bar">
				<p className="bar__timecode">{timecode}</p>
				<div className='bar__progress'>
					<div className='bar__greenprogress' ref={progressRef}></div>
				</div>
				<p className="bar__timecode">{durationCode}</p>
				<audio ref={audioRef}
					src={audioSrc}
					onTimeUpdate={onTimeUpdate}
					autoPlay={autoPlay}
				/>
			</div>
		</div>
	)
}

export default TrackBar