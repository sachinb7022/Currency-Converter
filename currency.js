const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdowns=document.querySelectorAll('.dropdown select');
const fromCurr=document.querySelector('.from select');
const toCurr=document.querySelector('.to select');

for (let select of dropdowns){
    for(currCode in countryList){
        let newOption=document.createElement('option');
        newOption.innerText=currCode;
        newOption.value=currCode;
        select.append(newOption);
        if(select.name==='from' && currCode==='USD'){
            newOption.selected='selected';
        }else if(select.name==='to' && currCode==='INR'){
            newOption.selected='selected';
        }
    }
    select.addEventListener('change',(evt)=>{
        updateflag(evt.target);
        
    })
}



const updateflag=(element)=>{
    
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector('img');
    img.src=newSrc;
}


const btn=document.querySelector('form button');
btn.addEventListener('click',(evt)=>{
    evt.preventDefault();
    updateExchange();
    
} 
)

const updateExchange=async ()=>{
    let amount=document.querySelector('.amount input');
    if(amount.value<=0 ||amount.value===''){
        amount.value=1;
        amount.innerText='1';
    }

   
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    
    let response=await fetch(URL);
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()];
    for(value in rate){
        // console.log(rate[value]);
        if(value===toCurr.value.toLowerCase()){
            let finalVal=rate[value]*amount.value;

            const msg=document.querySelector('.msg');
            msg.innerText=`${amount.value} ${fromCurr.value} = ${finalVal} ${toCurr.value}`;
        }
    }  
}

window.addEventListener('load',(evt)=>{
    updateExchange();
    
})

