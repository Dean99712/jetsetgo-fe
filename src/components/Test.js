import React, {Component} from 'react';

class Test extends Component {
    state = {
        person: [
            {
                name: "Yehuda",
                age: 26,
            },
            {
                name: "Dean",
                age: 25,
            },
            {
                name: "Ofek",
                age: 28,
            }
        ],
    }

    render() {
        return (
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                translate: "transform(-50%, -50%)"

            }}>
                {this.state.person.map(person => {
                    return (
                        <div>
                            <p>{person.name}</p>
                            <p>{person.age}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default Test;