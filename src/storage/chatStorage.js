    export const getChats = () => {
        const chats = localStorage.getItem('chats');
        return chats ? JSON.parse(chats) : [];
    }

    export const addChat = (chat) => {
        const chats = getChats();
        chats.push(chat);
        localStorage.setItem('chats', JSON.stringify(chats));
    }
