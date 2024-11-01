/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
import { titleFont } from '@/config/fonts';
import { LoginForm } from './login/LoginForm';

export default function () {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">

      <h1 className={ `${ titleFont.className } text-4xl mb-5` }>Ingresar</h1>

      <LoginForm />
    </div>
  );
}