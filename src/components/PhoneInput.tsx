import React, { useState } from 'react';

const PhoneInput: React.FC = () => {

    const [phone, setPhone] = useState("");

    const formatPhoneInput = (input:string) => {

        const cleanValue = input.replace(/\D/g,"");

        const match = cleanValue.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);


        if(!match)
            return "";

        const [,part1, part2, part3] = match;
        let formatted = "";

        if(part1) formatted += `(${part1}`;
        if(part1 && part1.length === 3) formatted += ') ';
        if(part2) formatted += `${part2}`
        if(part2 && part2.length === 3) formatted += '-'
        if(part3) formatted += `${part3}`

        return formatted
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputValue:string = e.target.value;

        const formattedInput = formatPhoneInput(inputValue);
        setPhone(formattedInput);
    }

  return (
    <div>
        <label htmlFor="phone">Phone Number</label>
        <input
        id="phone"
        type='tel'
        required
        onChange={handleChange}
        value={phone}
        placeholder='(787) 415-8736'
        maxLength={14}
        pattern="^\(\d{3}\) \d{3}-\d{4}$"
        title="Phone number must match format: (123) 456-7890"
        >
        </input>
    </div>
  );
};

export default PhoneInput;