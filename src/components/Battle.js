import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const PlayerPreview = (props) => (
    <div>
        <div className="column">
            <img className="avatar"
                 src={props.avatar}
                 alt={'Avatar for ' + props.username}
            />
            <h2 className="username">@{props.username}</h2>
        </div>
        <button
            className="reset"
            onClick={props.onReset.bind(null, props.id)}>
            Reset
        </button>
    </div>
)
PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
    }
    handleChange = (event) => {
        let value = event.target.value;

        this.setState(function () {
            return {
                username: value
            }
        });
    }
    handleSubmit = (event) => {
        event.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username
        );
    }
    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>{this.props.label}</label>
                <input
                    id='username'
                    placeholder='github username'
                    type='text'
                    value={this.state.username}
                    autoComplete='off'
                    onChange={this.handleChange}
                />
                <button
                    className='button'
                    type='submit'
                    disabled={!this.state.username}>
                    Submit
                </button>
            </form>
        )
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
}

PlayerInput.defaultProps = {
    label: 'Username',
}

class Battle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null,
        };
    }
    handleSubmit = (id, username) => {
        this.setState(function () {
            let newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200';
            return newState;
        });
    }
    handleReset = (id) => {
        this.setState(function() {
            let newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        })
    }
    render() {
        let match = this.props.match;
        let playerOneName = this.state.playerOneName;
        let playerTwoName = this.state.playerTwoName;
        let playerOneImage = this.state.playerOneImage;
        let playerTwoImage = this.state.playerTwoImage;

        return (
            <div>
                <div className='row'>
                    {!playerOneName &&
                    <PlayerInput
                        id='playerOne'
                        label='Player One'
                        onSubmit={this.handleSubmit}
                    />}

                    {playerOneImage !== null &&
                    <PlayerPreview
                        avatar={playerOneImage}
                        username={playerOneName}
                        id="playerOne"
                        onReset={this.handleReset}
                    />}

                    {!playerTwoName &&
                    <PlayerInput
                        id='playerTwo'
                        label='Player Two'
                        onSubmit={this.handleSubmit}
                    />}

                    {playerTwoImage !== null &&
                    <PlayerPreview
                        avatar={playerTwoImage}
                        username={playerTwoName}
                        id="playerTwo"
                        onReset={this.handleReset}
                    />}
                </div>
                {playerOneImage && playerTwoImage &&
                    <Link
                        className="button"
                        to={{
                            pathname: match.url + '/results',
                            search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                        }}
                    >Battle</Link>
                }
            </div>
        )
    }
}

export default Battle;