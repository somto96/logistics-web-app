import SignInPageHeader from "@/components/Layouts/SignInPageHeader";
import CreateAccountForm from "@/forms/CreateAccountForm";

export default function CreateAccountPage() {

    return(
        <>
            <SignInPageHeader/>
            <div className="h-screen w-full bg-[url('/images/pngs/slider-two.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center overflow-y-scroll">
                <div className="h-screen">
                    <h1 className="text-white font-medium tracking-wide text-3xl text-center mb-8">
                        Create Account
                    </h1>
                    <CreateAccountForm/>
                </div>
            </div>
        </>
    )
}