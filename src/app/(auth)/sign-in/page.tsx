import SignInPageHeader from "@/components/Layouts/SignInPageHeader";
import SignInForm from "@/forms/SignInForm";

export default function SignInPage() {

    return(
        <>
            <SignInPageHeader/>
            <div className="h-screen w-full bg-[url('/images/pngs/slider-two.png')] bg-no-repeat bg-cover bg-center flex items-center justify-center">
                <SignInForm/>
            </div>
        </>
    )
}