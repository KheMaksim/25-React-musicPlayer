import { MouseEventHandler } from 'react';
import './Button.css'

interface Props {
	type: string;
	onClickHandler: MouseEventHandler<HTMLButtonElement>;
	src: string;
	text?: string;
}

const Button = ({ type, onClickHandler, src, text }: Props) => {
	return (
		<button className={`btn ${type}`} onClick={onClickHandler}>
			<img className='btn__image' src={src} />
			{text}
		</button>
	)
}

export default Button