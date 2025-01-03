import { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '../../assets/images/logo.png';
import discord from '../../assets/images/discord.png';
import youtube from '../../assets/images/youtube.png';
import { useModal } from '../../components/Modal/hooks';
import { useTitlebar } from '../../components/TitleBar/hooks';
import classes from './index.module.sass';

interface AuthData {
    [k: string]: string;
    login: string;
    password: string;
}

export default function Login() {
    const { showModal } = useModal();
    const { setTitlebarUserText, showTitlebarUser } = useTitlebar();
    const navigate = useNavigate();

    const auth = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const { login, password } = Object.fromEntries(formData) as AuthData;

        // Пример валидации
        if (login.length < 3) {
            return showModal(
                'Ошибка ввода',
                'Логин должен быть не менее 3-ёх символов',
            );
        }
        if (password.length < 8) {
            return showModal(
                'Ошибка ввода',
                'Пароль должен быть не менее 8-ми символов'
            );
        }

        let userData;
        try {
            userData = await launcherAPI.scenes.login.auth(login, password);
        } catch (error) {
            console.error(error);
            return showModal('Ошибка авторизации', (error as Error).message);
        }

        // Поддержка загрузки и отображения скина
        localStorage.setItem('userData', JSON.stringify(userData));

        setTitlebarUserText(userData.username);
        showTitlebarUser();
        navigate('ServersList');
    };

    return (
        <>
        <div className={classes.topGradien}>
            <div className={classes.logo}>
                <img src={logo} />
            </div>
        </div>
        <div className={classes.block}>
            <form onSubmit={auth}>
                <label>Логин</label>
                <input type="text" name="login" />
                <label>Пароль</label>
                <input type="password" name="password" />
                <button>Войти</button>
                <p>Нет аккаунта? <a href="#" onClick={()=>launcherAPI.window.openExternal('http://launcher.nookaton.ru/register.php')}>Создать</a></p>
            </form>
        </div>
        <div className={classes.bottomGradien}>
            <div className={classes.socials}>
                <div className={classes.social}>
                    <img src={discord} />
                    <div className={classes.socialText}>
                        <a href="#" onClick={()=>launcherAPI.window.openExternal('https://discord.gg/Nookaton')}>Discord</a>
                        <p>@Nookaton</p>
                    </div>
                </div>
                <div className={classes.social}>
                    <img src={youtube} />
                    <div className={classes.socialText}>
                        <a href="#" onClick={()=>launcherAPI.window.openExternal('https://youtube.com')}>YouTube</a>
                        <p>@Nookaton</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
