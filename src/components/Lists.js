import React from 'react';
import PropTypes from 'prop-types';
import './Lists.css';


class Crazy extends React.Component {
    render() {
        let pages = ['home', 'blog', 'pics', 'bio', 'art', 'shop', 'about', 'contact'];
        let navLinks = pages.map(function (page, index) {
            return (
                <a href={'/' + page} key={index}>{page}</a>
            );
        });

        return (<nav className="list-nav">{navLinks}</nav>);
    }
}

class StringProps extends React.Component {
    handleClick = () => {
        return alert('asdasd');
    }

    render() {
        let stringProps = JSON.stringify(this.props);

        return (
            <div>
                <h1>CHECK OUT MY PROPS OBJECT</h1>
                <h2>{stringProps}</h2>
                <p>WHAAAAAT</p>
                <p>answer is simple - it's {this.props.love}</p>
                <button onClick={this.handleClick}>What if??</button>
            </div>
        );
    }
}
StringProps.propTypes = {
    love: PropTypes.string
}

class UsingChildren extends React.Component {
    render() {
        return (
            <ul>{this.props.children}</ul>
        );
    }
}

class ForgottenProp extends React.Component {
    render() {
        return (<p>{this.props.text}</p>);
    }
}
ForgottenProp.defaultProps = {text: "Look! It's default text!"};

class StateProps extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mood: 'bad'
        };
    }

    goForLunch = () => {
        let newMood = this.state.mood == 'great' ? 'bad' : 'great';
        this.setState({
            mood: newMood
        });
    }

    render() {
        return (
            <div>
                <div>My mood is {this.state.mood}</div>
                <button onClick={this.goForLunch}>
                    Take a break
                </button>
            </div>
        )
    }
}

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}


class Lists extends React.Component {
    render() {
        return (
            <div>
                <Crazy/>
                <StringProps love='true!'/>
                <UsingChildren>
                    <li>so doge</li>
                    <li>such wow</li>
                </UsingChildren>
                <ForgottenProp/>
                <Clock/>
                <StateProps/>
            </div>
        );
    }
}


export default Lists;