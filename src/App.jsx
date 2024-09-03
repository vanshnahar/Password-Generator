import { useState ,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
const [length,setlength]=useState(6);
const [numberallowed,setnumberallowed]=useState(false);
const [charallowed,setcharallowed]=useState(false);

const [password,setpassword]=useState('');

const passwordRef=useRef(null); 

const passwordgenerator=useCallback(()=>{
let pass="";
let str="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
if(numberallowed) str+="0123456789";
if(charallowed) str+="!@#$%^&*()_+";

for(let i=1;i<=length;i++)
{
  let char=Math.floor(Math.random()* str.length + 1)
  pass+=str.charAt(char);
}
setpassword(pass);

},[length,numberallowed,charallowed,setpassword])

const copyPasswordtoClipboard=useCallback(()=>{
 passwordRef.current?.select();
 passwordRef.current?.setSelectionRange(0,999);

 window.navigator.clipboard.writeText(password);
},[password]);



useEffect(()=>{
  passwordgenerator()
},[passwordgenerator,length,numberallowed,charallowed])

 
  return (
    <>
    
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4  py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3 font-medium ">Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3' 
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
         <button 
         onClick={copyPasswordtoClipboard}
         className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-200  hover:text-blue-700" > copy</button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
            type="range" 
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setlength(e.target.value)}}
             />
             <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
            type='checkbox'
            defaultChecked={numberallowed}
            id="Numberinput"
            onChange={(e)=>{
              setnumberallowed(e.target.checked)
            }}
            />
            <label htmlFor="Numberinput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
            type='checkbox'
            defaultChecked={charallowed}
            id="charinput"
            onChange={(e)=>{
              setcharallowed(e.target.checked)
            }}
            />
            <label htmlFor="charinput">Characters</label>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default App
