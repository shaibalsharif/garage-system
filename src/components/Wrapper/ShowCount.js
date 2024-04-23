const ShowCount = ({bg, title, iname, count}) => {


    const getbg =(cat)=>{
return 'green-500'
    }
  return  <div className="--col-span-full  mx-[25%] sm:col-span-1 " >
  <div className={`card bg-green-500 text-white`}>
      <div className="card-body w-fit mx-auto">
          <div className="row">
              <div className="col-3"><h3><i className={`fa fa-${iname}`} /></h3></div>
              <div className="col-9">
                  <h4>{title}</h4>
                  <h4>{count}</h4>
              </div>
          </div>
      </div>
  </div>
</div>
};

export default ShowCount;
