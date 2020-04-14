import React from 'react';
import ReactDOM from 'react-dom';
import posed, { PoseGroup } from 'react-pose';
import shuffle from './shuffle';
import './styles.css';

const Item = posed.li({
});

const frasi = [
  "Mi faccio suggestionare da quello che sento in giro",
  "Mi irrito spesso",
  "Inoltro tutti i i messaggi che ricevo senza verificarne la veridicità",
  "Basta poco per farmi arrabbiare",
  "A Volte penso che tutto questo non finirà per tanto tempo/durerà troppo a lungo",
  "Evito di mangiare spesso quelle cose buone ma che fanno male",
  "Approfondisco la veridicità delle notizie che ricevo",
  "Mi confronto con i miei amici su questa situazione",
  "Non invio bufale",
  "Riconosco che stiamo tutti cercando di fare del nostro meglio",
  "Penso agli altri e cerco modi per aiutarli, anche se difficile",
  "Aiuto i miei genitori/nonni ad utilizzare la tecnologia",
  "Associo all’evento lati positivi (meno inquinamento … )",
  "Sono grato e apprezzo",
  "Cerco di mantenermi felice e trasmettere questa mia felicità agli amici",
  "Cerco un modo per adattarmi ai nuovi cambiamenti",
  "Cerco di rimanere sereno, non facendomi prendere dall’ansia",
  "Approfitto del tempo a disposizione per imparare cose nuove"
]

class Example extends React.Component {
  state = { items: Object.keys([...Array(18)]), selected: [] };

  componentDidMount() {
    this.setState({
      items: shuffle(this.state.items),
    });
  }

  handleClick = (id) => () => {
    const current = this.state.selected
    if (current.includes(id)) {
      this.setState(x => ({ ...x, selected: x.selected.filter(x => x !== id) }))
    } else {
      this.setState(x => ({ ...x, selected: [...x.selected, id] }))
    }
  }

  handleFinished = () => {
    this.setState({
      items: Object.keys([...Array(18)]),
      finished: true
    })
  }

  render() {
    const { items, finished, selected } = this.state;
    const pauraCount = selected.filter(x => x < 5).length
    const apprendimentoCount = selected.filter(x => x >= 5 && x < 10).length
    const crescitaCount = selected.filter(x => x >= 10).length
    const maxZone = [{ name: 'paura', count: pauraCount }, { name: 'apprendimento', count: apprendimentoCount }, { name: 'crescita', count: crescitaCount }].reduce((acc, cur) => {
      if(!acc) return cur
      else return cur.count > acc.count ? cur : acc
    }, null)

    return (
      <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', marginVertical: 20 }}>
        <h1>Come vivo il virus?</h1>
        <h2>{finished
          ? 'Grazie per aver partecipato'
          : 'Seleziona le frasi in cui ti ritrovi'}
        </h2>
        {finished && <React.Fragment>
          <h4>Sei nella zona {maxZone.name}</h4>
          <p>{pauraCount}/5 zona di paura</p>
          <p>{apprendimentoCount}/5 zona di apprendimento</p>
          <p>{crescitaCount}/8 zona di crescita</p>
        </React.Fragment>}
        {finished && <h4>Ecco in quale zona sono posizionate le varie affermazioni</h4>}
        {!finished &&
          <ul>
            <PoseGroup>{items.map(id => <Item key={id} className={[
              this.state.selected.includes(id) ? 'selected' : '',
            ].join(' ')} onClick={this.handleClick(id)}>{frasi[id]}</Item>)}</PoseGroup>
          </ul>}
        {finished &&
          <React.Fragment>
            <h2>Zona di paura</h2>
            <ul>
              <PoseGroup>{items.slice(0, 5).map(id => <Item key={id} className={[
                this.state.selected.includes(id) ? 'selected' : '',
                'finished paura'
              ].join(' ')}
              >
                {frasi[id]}
              </Item>)}</PoseGroup>
            </ul>
            <h2>Zona di apprendimento</h2>
            <ul>
              <PoseGroup>{items.slice(5, 10).map(id => <Item key={id} className={[
                this.state.selected.includes(id) ? 'selected' : '',
                'finished apprendimento'
              ].join(' ')}
              >
                {frasi[id]}
              </Item>)}</PoseGroup>
            </ul>
            <h2>Zona di crescita</h2>
            <ul>
              <PoseGroup>{items.slice(10).map(id => <Item key={id} className={[
                this.state.selected.includes(id) ? 'selected' : '',
                'finished crescita'
              ].join(' ')}
              >
                {frasi[id]}
              </Item>)}</PoseGroup>
            </ul>
          </React.Fragment>}
        {!finished && <input type='text' placeholder={`Nome e unità`} onChange={event => this.setState({ nome: event.target.value })}></input>}
        {!finished && <button disabled={!this.state.nome || !this.state.selected.length} onClick={this.handleFinished}>Fatto!</button>}
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Example />, rootElement);
