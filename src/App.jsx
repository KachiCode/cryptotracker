import { useState, useEffect } from 'react'



function App() {
  const [count, setCount] = useState(0)
  const [jsonData15, setJsonData15] = useState([]);
  const [jsonData400, setJsonData400] = useState([]);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/KachiCode/cryptotrackerdata/main/15days.json')
      .then((response) => response.json())
      .then((data) => setJsonData15(data));

    fetch('https://raw.githubusercontent.com/KachiCode/cryptotrackerdata/main/400days.json')
      .then((response) => response.json())
      .then((data) => setJsonData400(data));
  }, []); // Empty dependency array ensures the effect runs only once on component mount
  
  console.log("Hello")
  return (
    <>
      <div className='flex bg-zinc-800  w-screen h-screen text-xl font-bold  text-dimWhite  '>
                <div className=' flex flex-col  ml-5 mt-5 grow bg-cmpgrey'  >{
          Object.keys(jsonData15)
            .sort((a, b) => jsonData15[b]["volume"] - jsonData15[a]["volume"]) // Sort keys by descending volume
            .map((keyName, i) => (
              <div className='flex mb-4 ' key={keyName}>
                {i + 1} {jsonData15[keyName]["name"]} {jsonData15[keyName]["symbol"]} {jsonData15[keyName]["date_added"].slice(0, 10)} {jsonData15[keyName]["volume_converted"]}
              </div>
            ))
                }
        </div>
        
        
        
        
        
        <div className=' flex flex-col  ml-5 mt-5 grow bg-cmpgrey'  >{
              Object.keys(jsonData400)
                .sort((a, b) => jsonData400[b]["volume"] - jsonData400[a]["volume"]) // Sort keys by descending volume
                .map((keyName, i) => (
                  <div className='flex mb-4' key={keyName}>
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
