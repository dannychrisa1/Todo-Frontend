const Greet = ({name}: {name?:string}) => {
    if(name) return <h1>Hello {name}</h1>;

    return <button>login</button>;
}

export default Greet;