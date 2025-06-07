export async function getOverviewData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    agencies: {
      url: "agency",
      value: 3456,
      growthRate: 0.43,
    },
    automobiles: {
      url: "automobile",
      value: 4220,
      growthRate: 4.35,
    },
    salaries: {
      url: "salary",
      value: 3456,
      growthRate: 2.59,
    },
    employees: {
      url: "employee",
      value: 3456,
      growthRate: -0.95,
    },
    cities: {
      url: "city",
      value: 3456,
      growthRate: -0.95,
    },
    roles: {
      url: "role",
      value: 3456,
      growthRate: -0.95,
    }
    
  };
}

export async function getChatsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      name: " victor FONGANG",
      profile: "/images/user/dicap.png",
      isActive: true,
      lastMessage: {
        content: "See you tomorrow at the meeting!",
        type: "text",
        timestamp: "2024-12-19T14:30:00Z",
        isRead: false,
      },
      unreadCount: 3,
    },
    {
      name: "mohammed MFENTAM",
      profile: "/images/user/mhd.png",
      isActive: true,
      lastMessage: {
        content: "Thanks for the update",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      name: "asaph KOUOKAM",
      profile: "/images/user/asaph.png",
      isActive: false,
      lastMessage: {
        content: "What's up?",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      name: "Marcelle CHEGUEUP",
      profile: "/images/user/marcelle.png",
      isActive: false,
      lastMessage: {
        content: "Where are you now?",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 2,
    },
    {
      name: "dicap",
      profile: "/images/user/dicap.png",
      isActive: false,
      lastMessage: {
        content: "Hey, how are you?",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
  ];
}