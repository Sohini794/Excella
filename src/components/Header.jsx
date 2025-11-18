import react from 'react'

const Header = () => {
    return (
        <div className=' items-center justify-center bg-gray-900 p-2 shadow-lg m-2 rounded-lg'>
        <div className='flex flex-col items-center justify-center p-2'> 
               <h1 
            className=" text-3xl font-extrabold text-white  justify-center text-center ">
                EXCELLA
            </h1>
            <p className='text-white'>AI Excel automation tool</p>
            </div>
        </div>
    )
}

export default Header;