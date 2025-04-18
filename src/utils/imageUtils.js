const getRandomColor = () => {
    const colors = [
      '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
      '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
      '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const getInitials = (name) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };
  
  const generateAvatarUrl = (userId, size = 150) => {
    // For consistent random avatars based on userId
    return `https://i.pravatar.cc/${size}?u=${userId}`;
  };
  
  const generateRandomImageUrl = (postId, width = 600, height = 400) => {
    // For consistent random post images based on postId
    return `https://picsum.photos/seed/${postId}/${width}/${height}`;
  };
  
  export {
    getRandomColor,
    getInitials,
    generateAvatarUrl,
    generateRandomImageUrl
  };