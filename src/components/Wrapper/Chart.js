import { Bar, Pie } from "react-chartjs-2"

const Chart = ({type, data_labels}) => {
    let initData=[], initLabels=[]
    const getData=()=>{
        data_labels.map((d)=>{
            initData.push(d.qty)
        })
        return initData
    }
    const getLabels=()=>{
        data_labels.map((l)=>{
            initLabels.push(l.category)
        })
        return initLabels
    }


    
    return type=='bar'? (
       

        <Bar
            data={{
                labels: getLabels() ,
                datasets: [{
                    label: '# of items sold',
                    data:  getData() ,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                }]
            }}
            options={{
                scales: {
                    y: {
                      beginAtZero: true
                    }
                  }
              }}
        />
    ): type=='pie'?( <div className=""><Pie
        data={{
            labels: getLabels() ,
            datasets: [{
                label: '# of items sold',
                data:  getData() ,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                
            }]
        }}
        options={{

        
            radius: '45%'
          }
        }
        
    /> </div>):(<div></div>)

}

export default Chart