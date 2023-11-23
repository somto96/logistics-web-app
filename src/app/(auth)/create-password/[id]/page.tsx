import SignInPageHeader from "@/components/Layouts/SignInPageHeader";
import CreatePasswordForm from "@/forms/CreatePasswordForm";

export default function CreatePassword({ params }: { params: { id: string } }) {

    return(
        <>
            <SignInPageHeader/>
            <div className="h-screen w-full bg-[url('/images/pngs/slider-two.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center overflow-y-scroll">
                <div className="h-screen flex flex-col justify-center">
                    <h1 className="text-white font-medium tracking-wide text-3xl text-center mb-8">
                        Create Account
                    </h1>
                    <CreatePasswordForm
                        companyId={params.id}
                    />
                </div>
            </div>
        </>
    )
}