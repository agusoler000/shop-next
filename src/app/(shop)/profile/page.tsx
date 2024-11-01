import { auth } from "@/auth";
import { Title } from "@/components";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
    const session = await auth()
    if(!session?.user){
        // redirect('/auth/login?returnTo=/profile')
        redirect('/')
    }
  return (
    <div>
     <Title title="Perfil" />
        <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">Perfil</h1>
            <p className="text-lg">Bienvenido {session.user?.name}</p>
            <p className="text-lg">Tu email es {session.user?.email}</p>
            <p className="text-lg">Tu foto es {session.user?.image}</p>
            <p className="text-lg">Tu foto es {session.user?.role}</p>
            <p>

              {/* {JSON.stringify(session)} */}
            </p>
        </div>
    </div>
  );
}