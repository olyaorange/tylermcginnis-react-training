import React from 'react';
import PropTypes from 'prop-types';
import api from '../utils/api';


function SelectLanguage(props) {
    let languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className="languages">
            {languages.map(function (lang) {
                return (
                    <li
                        style={lang === props.selectedLanguage ? { color: '#d0021b'} : null }
                        onClick={() => props.onSelect(lang)}
                        //onClick={this.props.onSelect.bind(null, lang)}
                        key={lang}>
                        {lang}
                    </li>
                );
            })}
        </ul>
    );
}

function RepoGrid (props) {
    return (
        <ul className="popular-list">
            {props.repos.map(function(repo, index) {
                return (
                    <li className="popular-item" key={repo.name}>
                        <div className="popular-rank">#{index + 1}</div>
                        <ul className="space-list-items">
                            <li>
                                <img className="avatar" src={repo.owner.avatar_url} alt={'Avatar for ' + repo.owner.login}/>
                            </li>
                            <li>
                                <a href={repo.html_url}>{repo.name}</a>
                            </li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                            <li>{repo.language}</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
};
RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
};

class Popular extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };
    }

    updateLanguage = (lang) => {
        this.setState(function () {
            return {
                selectedLanguage: lang,
                repos: null
            }
        });
        api.fetchPopularRepos(lang)
            .then((repos) => {
                this.setState(function() {
                    return {
                        repos: repos
                    }
                })
            })
    };
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage);
    }

    render() {

        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
                {/*test*/}
                {/*{JSON.stringify(this.state.repos, 2, null)}*/}

                {!this.state.repos
                    ? <p>LOADING</p>
                    : <RepoGrid repos={this.state.repos} />}
            </div>
        );
    }
}

export default Popular;