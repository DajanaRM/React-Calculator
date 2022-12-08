import './App.css';
import React, { useState, useRef, useEffect } from 'react'
 
function App() {
    let c = ['0']
    let ref = useRef(c)
    const [result, setResult] = useState(['0'])
    const reg = /[\/\*\+\-]/
    const reg1 = /[\/\*\+\-\^√\=]/
    const regex = /[0-9\*\+\-.\/\(\)\^\=√]/g
    
    function restrictInput(e) {
        c = []
        let n = true
        let s = [...e].filter((a, i) => a.match(regex))
       
        for(let i = 0; i < s.length; i++){
            
            if(s[i].match(/[0-9\(]/) !== null && s[i-1] === '0' && (i === 1 || s[i-2] && s[i-2].match(reg1) !== null)) s[i-1] = ''
            
            if(i >= 2 && s[i-1] === '2' && s[i-2] === "^" && s[i].match(/[0-9]/) !== null) s[i] = ''
              
            if(s[i].match(/[0-9]/) === null && s[i] !== '=' && s[i-1] === '.') s[i-1] = ''
            
            if(s[i] === '.' && i === s.length - 1 && s.lastIndexOf('.', i - 1) !== -1){
                let k1 =  s.lastIndexOf('.')
                let k2 = s.lastIndexOf('.', i - 1)
                if(s.join('').slice(k2 + 1, k1).match(reg) === null) {
                s[i] = ''
                }
            }
            
            if(i !== 0 && (s[i].match(reg1) && s[i] !== '√' || s[i].match(/\^/)) && (s[i-1].match(reg)  || s[i-1].match(/\^/))) {
               
                s[i-1] = ''
            }
            
            if(i=== 0 && s.length === 1 && s[i] === '√') s[i] = s[i] + '(0)'
            
            if(s[i] === '.' && ( i === 0 || s[i-1].match(/[0-9]/) === null )) {
                if(s[i-1] === '') s[i] = '.'
                else s[i]='0.'
            }
            
            if((s[i] === '(' && s[i-1] ===')')) s[i] = ''

            if(i === s.length-1 && i !== 0 && s[i] === '√' && (s[i-1].match(reg1) !== null  || s[i-1] === '(' )) s[i] = ''
            
            
            if(s[i] === ')' && s[i-1] ==='(') {
                s[i-1] = '(0)'
                s[i] = ''
            }
           
            if(s[i] === ')' && !s.includes('(') && n) s[i] = '' 
           
            if((s[i] === '=' || s[i] === '√') && s.includes('(')){ 
            
                if(s[i] === '=') {
                    if(s[i-1] ==='(') s[i-1] = '(0'
                    if(s[i-1].match(reg1) !== null) s[i-1] = ''
                    s[i] = ')'.repeat(s.join('').match( new RegExp(/\(/, 'g')).length - (s.join('').match( new RegExp(/\)/, 'g')) || []).length) + s[i]
                   
                }
                
                if(i === s.length -1 && s[i] === '√' && (s[i-1] === '√' || s[i-1].match(reg) !== null)) s[i] = '' 
                
                if(s[i] === '√') {
                    if(s[i] === '√' && i !== 0 &&  (s[i-1].match(/[0-9]/) !== null || (s[i-1] === '' && i === s.length-1))) {
                       
                        if(s[i-1] === '') i--
                        n = false
                        i--
                        while((s[i].match(/[0-9]/) !== null || (s[i] === '(' && s[i-1] !== '^') || s[i] === '.' || s[i] === '√' || s[i] === '^') && i > 0) i--
                        if(i !== 0) s[i] =  s[i] + '√(' 
                        else s[i] =  '√(' + s[i]
                         s[s.length-1] =  ')'.repeat(s.join('').match( new RegExp(/\(/, 'g')).length - (s.join('').match( new RegExp(/\)/, 'g')) || []).length)
                    }
                
                    if(s[i] === '√' && i !== 0 && s[i-1] === ')') {
                        let a = s.join('').slice(s.lastIndexOf('(')+1).match( new RegExp(/\)/, 'g')).length
                        let b = s.lastIndexOf('(')+1
                        
                        if(s[b-2] === '√') {
                           if(s[b-a] === '√') s[b-a] = '√(' + s[b-a]
                           if(s[b-a] === '(') s[b-a] = s[b-a] + '√('
                        }
                         else {
                            s[b-a] = '√' + s[b-a]
                            
                         }  
                          s[s.length-1] =  ')'.repeat(s.join('').match( /\(/g).length - (s.join('').match(/\)/g) || []).length)
                    }
                }
            }
          
            
            if(s[i] === '('  && i !== 0 && (s[i-1].match(/[0-9]/) !== null || s[i-1] === '.'))
                while(s[i] === '(' && i !== 0  && (s[i-1].match(/[0-9]/) !== null || s[i-1] === '.')) {
                    s[i] = s[i-1] 
                    s[i-1] = '('
                    i--
                }
            
            if(s[i] === '√' && i !== 0 && s[i-1].match(/[0-9]/) !== null ) {
                n = false
                i--
                while((s[i].match(/[0-9]/) !== null || s[i] == '.' || s[i] === '^') && i > 0 && (s[i-1].match(/[0-9]/)  !== null || s[i-1] == '.' || s[i-1] === '^')) i--
                s[i] = '√(' + s[i] 
                s[s.length-1] =  ')'
            }
            
            if(s[i] === '√' && i !== 0 && s[i-1] === ')') {
                let a = s.join('').slice(s.lastIndexOf('(')+1).match( new RegExp(/\)/, 'g')).length
                let b = s.lastIndexOf('(')+1
                s[b-a] = '√' + s[b-a]
                s[s.length-1] =  ''
            }
            
            if(s[s.length-1] === ')'  && s.includes('(') && (s.join('').match( new RegExp(/\)/, 'g')).length > s.join('').match( new RegExp(/\(/, 'g')).length )) {
                s[s.length-1] = ''
                
            }
            
            if(s[i].match(reg) !== null && i !== 0 && ((s[i-1].match(/\(/) !== null  && s[i] !== '-') || (i !== s.length-1 && s[i+1].match(/\)/) !== null ))) {
                s[i] = ''
                if(s[i-1].match(reg1) !== null && s[i-1] !== '-') s[i-1] = ''
            }
           
            if(s[i+1] && s[i+1] !== '(' && s[i] === '√')  s[i] = ''
           
        }
    
        ref.current.value = s.join('')
    }
    
    function evalRes(e) {
        if(e.length) {
           if(e[e.length-1].match(reg) || e[e.length-1] === '.') e = e.slice(0, e.length-1)
            if(e[0] === '(' && e.indexOf(')') === -1) e = e.slice(1)
                
            return new Function('return ' + e)()
        }
        ref.current.focus()
    }
    
   
    function handleClick(e) {
        c.push(ref.current.value)
        c.push(e)
        
        ref.current.value = c.join('')
        restrictInput(ref.current.value)
        
        let res
        let l = ref.current.value.length
        if(l && ref.current.value[l - 1].match(reg1) !== null && (ref.current.value.match(/\(/g) || []).length === (ref.current.value.match(/\)/g) || []).length) {
            res = evalRes(refineInput(ref.current.value))
            if(ref.current.value[ref.current.value.length-1] === '=') ref.current.value = res
            if(res === Infinity) res = "Cannot divide by zero"
            setResult(res)
        }
        ref.current.focus()
    }
    

    function handleKeyDown(e) {
        
        if(e.shiftKey){
            if(e.keyCode === 57)  handleClick('(')
            if(e.keyCode === 48)  handleClick(')')
            if(e.keyCode === 54)  handleClick('^')
            if(e.keyCode === 56)  handleClick('*')
            if(e.keyCode === 187)  handleClick('+')
            
        }
        else {
        
            if(e.keyCode >= 96 && e.keyCode <=105 || (e.keyCode >= 48 && e.keyCode <=57)) {
                handleOnScreenKeyboard(e.key)
            }
            
            if([107, 111, 106, 109].includes(e.keyCode)){
                handleOnScreenKeyboard(e.key)
                handleClick('')
            }
            
            if(e.keyCode === 110 || e.keyCode === 190) handleOnScreenKeyboard('.')
                
            if([13, 187].includes(e.keyCode)){
               handleClick('=')
            }
            
            if(e.keyCode === 8) handleDelete(e.key) 
                
            if(e.keyCode === 27) {
                setResult(0)
                resetInput()             
            }  
            if(e.keyCode === 189)  handleClick('-')
        }        
            
    }
    
    function handleOnScreenKeyboard(e){
       ref.current.value = ref.current.value + e
       restrictInput(ref.current.value)
       ref.current.focus()
    }
    
    
    function refineInput(e){
        let res = [...e].map((a) => a === '^' ? '**' : a)
        res = res.map((a, i) => a === '√' ? 'Math.sqrt' : a)
        res = res.map((a) => a === '=' ? '' : a).join('')
       
       return res
    }
    
    function resetInput() {
        ref.current.value = '0'
        ref.current.focus()
    }
    
    function handleDelete(){
        ref.current.value = ref.current.value.slice(0, ref.current.value.length-1)
        ref.current.focus()
        
    }
    
    
    return (
        <div className="calculator"> 
            <input autoFocus readOnly type="text" defaultValue= '0' onKeyUp={(e) => handleKeyDown(e)} ref={ref}>
            </input>
            <div className="result">
            {result}
            </div>
            <div className='buttons'>
                <div className='buttonsgroup'>
                    <button  onClick={() => resetInput()}> C </button>
                    <button onClick={() => (setResult(0), ref.current.focus())}> CE </button>
                    <button value="delete"  onClick={() => handleDelete()} >&#9003; </button> 
                </div>
                <div className='buttonsgroup'>
                    <button value="^2"  onClick={(e) => handleOnScreenKeyboard(e.target.value)}> x<sup>2</sup> </button>
                    <button value="^"  onClick={(e) => (handleOnScreenKeyboard(e.target.value) ,refineInput(ref.current.value))} > x<sup>y</sup> </button>
                    <button value="="  onClick={(e) => handleClick(e.target.value)} > = </button>
                </div>
                <div className='buttonsgroup'>
                    <button value="+" onClick={(e) => handleClick(e.target.value)}> + </button>
                    <button value="-" onClick={(e) => handleClick(e.target.value)}> - </button>              
                    <button value="." onClick={(e) => handleOnScreenKeyboard(e.target.value)}> . </button>     
                </div>
                <div className='buttonsgroup'>
                    <button value="/" onClick={(e) => handleClick(e.target.value)}> / </button>                    
                    <button value="*" onClick={(e) => handleClick(e.target.value)}> * </button>
                    <button value="(" onClick={(e) => handleOnScreenKeyboard(e.target.value)}> ( </button>
                </div>
                <div className='buttonsgroup'>
                    <button  value="√"  onClick={(e) => (handleOnScreenKeyboard(e.target.value),refineInput(ref.current.value))}>&radic;x </button> 
                    <button value="0" onClick={(e) => handleOnScreenKeyboard(e.target.value)}> 0 </button> 
                    <button value=")" onClick={(e) => handleOnScreenKeyboard(e.target.value)}> ) </button>                    
                </div>
            
                <div className='buttonsgroup'>
                    <button value="7" onClick={(e) => handleOnScreenKeyboard(e.target.value)}> 7 </button>
                    <button value="8" onClick={(e) => handleOnScreenKeyboard(e.target.value)}> 8 </button>
                    <button value="9" onClick={(e) => handleOnScreenKeyboard(e.target.value)}> 9 </button>
                </div>
                <div className='buttonsgroup'>
                    <button value="4" onClick={(e) => handleOnScreenKeyboard(e.target.value)}> 4 </button>
                    <button value="5" onClick={(e) => handleOnScreenKeyboard(e.target.value)}> 5 </button>
                    <button value="6" onClick={(e) => handleOnScreenKeyboard(e.target.value)}> 6 </button>
                </div>
                <div className='buttonsgroup'>
                    <button value="1" onClick={(e) => handleOnScreenKeyboard(e.target.value)}> 1 </button>
                    <button value="2" onClick={(e) => handleOnScreenKeyboard(e.target.value)}> 2 </button>
                    <button value="3" onClick={(e) => handleOnScreenKeyboard(e.target.value)}> 3 </button>
                </div>
            </div>
        </div>
    );
}

export default App;
