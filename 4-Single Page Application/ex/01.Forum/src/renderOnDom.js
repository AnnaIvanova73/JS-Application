import {createElement,appendChildren} from './template.js'
const homeView  = ({topicName,username,_id,_createdOn}) => {
    let divTopic = createElement('div',null,['class=topic-container']);
    let divWrapper = createElement('div',null,['topic-name-wrapper']);

    let divTopicName = createElement('div',null,['class=topic-name']);
    let anchor = createElement('a', null,['class=normal','href=#']);
    let titleElement  = createElement('h2',topicName,[`data-id=${_id}`]);
    anchor.appendChild(titleElement);
    let divColumns = createElement('div',null,['class=columns']);
    let divInnerElement = createElement('div');

    let pDateElement = createElement('p')
    let timeElement = createElement('time',_createdOn);
    pDateElement.appendChild(timeElement);

    let divNickName = createElement('div',null,['class=nick-name']);
    let pUsername = createElement('p',`Username: `);
    let span = createElement('span',username);
    pUsername.appendChild(span);
    divNickName.appendChild(pUsername);
    appendChildren(divInnerElement,[pDateElement,divNickName])
    divColumns.appendChild(divInnerElement);
    appendChildren(divTopicName,[anchor,divColumns]);
    appendChildren(divWrapper,[divTopicName])
    divTopic.appendChild(divWrapper)
    return divTopic;
}

const postView  = ({postText,username,_id,_createdOn}) => {
    let divHeader = createElement('div',null,['class=header',`data-id=${_id}`]);
    let imgElement = createElement('img',null ,['src=./static/profile.png', 'alt=avatar']);
    let pElement = createElement('p');
    let span = createElement('span',username);
    let textNode = document.createTextNode(` posted on `);

    let timeElement =createElement('time',_createdOn);
    pElement.style.display = 'inline-block';
    appendChildren(pElement,[span,textNode,timeElement]);
    let pPostContent = createElement('p',postText,['class=post-content']);
    appendChildren(divHeader,[imgElement,pElement,pPostContent]);
    return divHeader;
};

const createComment = ({username,postText,_createdOn,_id}) => {
    let divWrapper = createElement('div',null,[`class=topic-name-wrapper`]);
    let divTopicName = createElement('div',null,['topic-name']);

    let pWrapper = createElement('p');
    let strong = createElement('strong',username);
    let textNode = document.createTextNode(` commented on `);
    let timeElement = createElement('time',_createdOn);
    appendChildren(pWrapper,[strong,textNode,timeElement]);
    let divPostContent = createElement('div',null,['class=post-content']);
    let postTextElement = createElement('p',postText);
    divPostContent.appendChild(postTextElement);
    appendChildren(divTopicName,[pWrapper,divPostContent]);
    divWrapper.appendChild(divTopicName);
    return divWrapper;
};

export default {
    homeView,postView,createComment
};