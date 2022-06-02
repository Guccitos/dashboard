export default class About extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items:[],
      isLoaded: false,
    }
  }
    componentDidMount(){

      fetch('https://api.dexscreener.io/latest/dex/tokens/0xd6CDd609aE911FD35F5e13e76242eA33902500d0/')
        .then(res => res.json())
        .then (json => {
                this.setState({
                  isLoaded: true,
                  items: json,
                })
        })
    }
  render() {
      var { isLoaded , items } = this.state;
      if (!isLoaded) {
        return <div>Loading...</div>;
      }
      else
          <div>
            Data has been loaded
          </div>

    return (
          <div>
            <ul>
              {items.map(item => (
                    <li key={item.id}>
                      Name: {item.priceUsd}
                    </li>
              ))};
            </ul>
          </div>
    ) 
  }
}