import React, { Component } from 'react';
import Axios from 'axios';
import './styles.css'

export default class Demsar extends Component {
  
    state = {
        data: []
    };

    componentDidMount(){
        Axios.post('http://localhost:3307/demsarTable', {month: 10}).then((res10) => {//[{art: 10, quantity: 10}],
            Axios.post('http://localhost:3307/demsarTable', {month: 11}).then((res11) => {
                Axios.post('http://localhost:3307/demsarTable', {month: 12}).then((res12) => {
                    let full = [res10.data, res11.data, res12.data];
                    let arts = full.reduce((acc, res) => {
                        res.forEach((obj) => {
                            if(acc.indexOf(obj.art) === -1)
                                acc.push(obj.art);
                        })
                        return acc;
                    }, []);
                    let data = arts.map((art) => {
                        let row = [art];
                        full.forEach((month) => {
                            let added = false;
                            month.forEach((artMonth) => {
                                if(artMonth.art !== art)
                                    return;
                                row.push(artMonth.total);
                                added = true;
                            })
                            if(!added)
                                row.push(0);
                        });
                        return row;
                    });
                    this.setState({data})
                });
            });
        });
    }

    render() {
        const data = this.state.data;
        return (
            <>
            <div id='main-container'>
                <table>
			    <thead>
			    	<tr>
			    		<th>Nombre artículos</th><th>Septiembre</th><th>Octubre</th><th>Noviembre</th>
			    	</tr>
			    </thead>
                    <tbody>
                        {this.state.data.map((row, i) => {
                            return (
                                <tr key={i}>
                                    <td>{data[i][0]}</td>
                                    <td>{data[i][1]}</td>
                                    <td>{data[i][2]}</td>
                                    <td>{data[i][3]}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            </>
        );
    }
}