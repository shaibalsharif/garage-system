import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
const generateNumbers = (n) => {
    const numbers = [];
    for (let i = 1; i <= n; i++) {
        numbers.push(i);
    }

    return numbers;
}

const columnFormatter = (column) => {
    return column?.map(item => {

        return {
            name: item.text,
            "selector": row => row[`${item.dataField}`],
            'cell': item.cell ? item.cell : null
        }
    })
}
const sliceData = (data, pageSize, currentPage, max) => {

    const start_index = pageSize * (currentPage - 1) + 1
    const end_index = (pageSize * currentPage)
    return data.slice(start_index - 1, max < end_index ? max : end_index)

}

const Paginator = ({ total_pages, currentPage, setCurrentPage, data, pageSize, setPageSize }) => {


    return <div className='w-full h-20 flex my-4 px-4 lg:px-[10%] py-2 '>
        <div className='w-full flex gap-4 justify-center'>
            {generateNumbers(total_pages).map(item => {

                return (<p onClick={() => setCurrentPage(item)}
                    className={`border-[2px]  ${currentPage == item ? "border-black bg-opacity-50 " : "border-transparent bg-opacity-20"}
                     h-fit  py-1 lg:py-0  px-2 rounded-full bg-gray-400  hover:bg-opacity-50 text-xs lg:text-sm
                shadow-lg cursor-pointer justify-center items-center`}>{item}</p>)
            })}
        </div>
        <div className='w-[50%] lg:w-[20%] flex items-start gap-2'>
            <p className='text-xs lg:text-sm'>Items per page:</p>
            <select className="text-xs lg:text-sm" onChange={e => setPageSize(e.target.value)}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
            </select>
        </div>
    </div>

}

const Table = ({ column, data, paginate = false }) => {
    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const total_pages = data?.length % pageSize ? parseInt(data?.length / pageSize) + 1 : parseInt(data?.length / pageSize)

    return (
        <>
            <DataTable
                /*  onRowClicked={(row) => handleAction(null, row)} */
                columns={column?.length ? columnFormatter(column) : []}
                data={sliceData(data?.length ? data : [], pageSize, currentPage, data.length)}

                customStyles={{
                    headRow: {
                    
                       /*  style: {
                            width: '4rem',
                        } */
                    },
                    rows: {
                        style: {
                         /*    width: '4rem', */
                            backgroundColor: '#FFFFFF',
                            '&:nth-child(2n)': {
                                backgroundColor: '#EEEEEE',
                            },
                        },
                    },
                }}
            />
            {paginate && <Paginator total_pages={total_pages} data={data} currentPage={currentPage} setCurrentPage={setCurrentPage}
                pageSize={pageSize} setPageSize={setPageSize} />}
        </>
    );
}

export default Table