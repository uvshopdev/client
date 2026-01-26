import { Blocks, CircleUserRound, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { button, categories, content, input, logo, navigation, profile, profileButton, search } from "./TopBar.css";

const TopBar = () => {
	return (
		<div className={content}>
			<div className={navigation}>
				<div className={logo}>
					<Image fill src="/logo.png" alt="logo" />
				</div>
				<button type="button" className={categories}>
					<Blocks size={20} strokeWidth={1} />
					Каталог
				</button>
			</div>
			<div className={search}>
				<input type="text" className={input} placeholder="Знайти свій скарб..." />
				<button type="button" className={button}>
					Пошук
				</button>
			</div>
			<div className={profile}>
				<button type="button" className={profileButton}>
					<ShoppingBasket size={25} strokeWidth={1} />
				</button>
				<button type="button" className={profileButton}>
					<CircleUserRound size={25} strokeWidth={1} />
				</button>
			</div>
		</div>
	);
};

export default TopBar;
