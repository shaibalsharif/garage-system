const ShowCount = ({ bg, title, iname, count }) => {


    const getbg = (cat) => {
        switch (cat) {
            case 'primary':

                return 'blue-500'
            case 'success':

                return 'green-500'
            case 'warning':

                return 'yellow-500'
            case 'danger':

                return 'red-500'
            default:
                return 'green-500'
        }

    }
    return <div className={`lg:w-1/4 rounded-md bg-${getbg(bg)}`} >
        <div className={`relative flex flex-col  rounded break-words border h-full border-1 border-gray-300  text-white`}>
            <div className="flex-auto p-6 w-full mx-auto ">
                <div className="flex justify-center items-center  w-full">
                    <div className="lg:w-1/4  "><h3><i className={`fa fa-${iname} fa-lg lg:fa-2x my-auto`} /></h3></div>
                    <div className="w-full lg:w-1/3 lg:text-xl font-semibold text-center" >
                        <h4>{title}</h4>
                        <h4 className="scale-125 text-center">{count}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default ShowCount;
