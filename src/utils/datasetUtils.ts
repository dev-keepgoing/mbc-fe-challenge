export const parseCSV = (text:string) => {
    console.log("text", text)
    const [headerLine, ...lines] = text.split("\n").filter(Boolean)
    const headers = headerLine.split(",");

    console.log("headers",headers);

    return lines.map((line) => {
        const values = line.split(",");
        return headers.reduce((obj,key,idx) => {
            obj[key.trim()] = values[idx]?.trim() || "";
            return obj;
        }, {} as Record<string,string>);
    });
};