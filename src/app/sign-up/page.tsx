import Link from "next/link";

const SignUp = () => {
    return (
    <main className="bg-pageBg bg-cover bg-center bg-no-repeat">
      <div className="w-full h-screen flex 
        justify-center items-center bg-black bg-opacity-45">
        <aside className="">
          <h1 className="text-center text-black font-light text-4xl 
            bg-yellow rounded-tl-[40px] m-0 py-4">Sign Up</h1>
          <form action="" className="bg-white w-full max-w-md rounded-br-[40px]
             bg-opacity-20 shadow-lg shadow-black p-6">
            <input 
              type="text" 
              name="" 
              placeholder="Full Name" 
              className="py-2 px-3 w-full text-lg text-black 
              font-light"
            />
            <input 
              type="email" 
              name="" 
              placeholder="E-mail" 
              className="py-2 px-3 w-full text-lg text-black 
              font-light outline-none mt-3"
            />            
            <input 
              type="password" 
              name="" 
              placeholder="Password" 
              className="py-2 px-3 w-full text-lg text-black 
              font-light outline-none mt-3"
            />
            <input 
              type="password" 
              name="" 
              placeholder="Confirm Password" 
              className="py-2 px-3 w-full text-lg text-black 
              font-light outline-none mt-3"
            />
            <div className="flex items-center justify-between mt-5">
              <Link href="/" className="text-white 
              cursor-pointer transition 
              hover:text-black">Already Registered?</Link>
              <button type="submit" className="bg-black 
                text-yellow font-medium py-2 px-8 transition 
                hover:text-white 
                hover:opacity-90 rounded-sm">Sign Up</button>
            </div>
          </form>
        </aside>
      </div>
    </main>
    )
}

export default SignUp;