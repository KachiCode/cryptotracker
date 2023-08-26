import { useState, useEffect } from 'react'



function App() {
  const [count, setCount] = useState(0)
  const [jsonData15, setJsonData15] = useState([]);
  const [jsonData400, setJsonData400] = useState([]);
  const [timestamp, setTimestamp] = useState([]);
  useEffect(() => {
    
    fetch('https://raw.githubusercontent.com/KachiCode/cryptotrackerdata/main/15days.json')
      .then((response) => response.json())
      .then((data) => setJsonData15(data));

    fetch('https://raw.githubusercontent.com/KachiCode/cryptotrackerdata/main/400days.json')
      .then((response) => response.json())
      .then((data) => setJsonData400(data));

    fetch('https://raw.githubusercontent.com/KachiCode/cryptotrackerdata/main/timestamp.json')
      .then((response) => response.json())
      .then((data) => setTimestamp(data));

    // Reload the website every 2 hours (7200 seconds)
    const reloadInterval = setInterval(() => {

      console.log("Hello")

      fetch('https://raw.githubusercontent.com/KachiCode/cryptotrackerdata/main/15days.json')
      .then((response) => response.json())
      .then((data) => setJsonData15(data));

    fetch('https://raw.githubusercontent.com/KachiCode/cryptotrackerdata/main/400days.json')
      .then((response) => response.json())
      .then((data) => setJsonData400(data));

    fetch('https://raw.githubusercontent.com/KachiCode/cryptotrackerdata/main/timestamp.json')
      .then((response) => response.json())
      .then((data) => setTimestamp(data));
    }, 7200000); // 7200 seconds = 2 hours

    // Clear the interval when the component is unmounted
    return () => {
      clearInterval(reloadInterval);
    };
  }, []);

  
  

  
  return (
    <>
      <div className='flex bg-zinc-800  w-screen h-screen text-2xl font-bold  text-dimWhite   '>
                <div className=' flex flex-col  ml-2 mt-1 w-1/2 bg-cmpgrey border-2 border-rose-500 flex-wrap '  >{
                    Object.keys(jsonData15)
                      .sort((a, b) => jsonData15[b]["volume"] - jsonData15[a]["volume"]) // Sort keys by descending volume
                      .map((keyName, i) => (
                        <div className= {`flex  mb-3 ml-1 ${jsonData15[keyName]["hot"] === 'yes' ? "border-4 border-green-500" : ""}`}  key={keyName}>
                          {i + 1} {jsonData15[keyName]["name"]} {jsonData15[keyName]["symbol"]} {jsonData15[keyName]["date_added"].slice(0, 10)} {jsonData15[keyName]["volume_converted"]}
                </div>
            ))
                }
            <div className='flex justify-center text-4xl text-green-500 '> {timestamp["timestamp"]} </div>
        </div>
        
        
        
        
        
        <div className=' flex flex-col  ml-2 mt-1 w-1/2 bg-cmpgrey border-2 border-rose-500'  >{
              Object.keys(jsonData400)
                .sort((a, b) => jsonData400[b]["volume"] - jsonData400[a]["volume"]) // Sort keys by descending volume
                .map((keyName, i) => (
                  <div className={`flex  mb-3 ml-1 ${jsonData400[keyName]["hot"] === 'yes' ? "border-4 border-green-500" : ""}`} key={keyName}>
                    {i + 1} {jsonData400[keyName]["name"]} {jsonData400[keyName]["symbol"]} {jsonData400[keyName]["date_added"].slice(0, 10)} {jsonData400[keyName]["volume_converted"]}
                  </div>
                ))
                    }
                    </div>
        
      </div>
      
    </>
  )
}

export default App
