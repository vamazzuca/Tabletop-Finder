export const isSameSenderMargin = (messages, message, i, userId) => {
    
  
    if (
      i < messages.length - 1 &&
      messages[i + 1].sender._id === message.sender._id &&
      messages[i].sender._id !== userId
    )
      return 36;
    else if (
      (i < messages.length - 1 &&
        messages[i + 1].sender._id !== message.sender._id &&
        messages[i].sender._id !== userId) ||
      (i === messages.length - 1 && messages[i].sender._id !== userId)
    )
      return 0;
    else return "auto";
  };
  
export const isSameSender = (messages, message, i, userId) => {
    
    return (
      i < messages.length - 1 &&
      (messages[i + 1].sender._id !== message.sender._id ||
        messages[i + 1].sender._id === undefined) &&
      messages[i].sender._id !== userId
    );
};

export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};
  

export const isSameUser = (messages, message, i) => {
    
    return i > 0 && messages[i - 1].sender._id === message.sender._id;
  };