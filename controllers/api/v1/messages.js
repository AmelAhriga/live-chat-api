let messages = [
  { id: 1, user: "Pikachu", text: "Hello World!" },
  { id: 2, user: "Amel", text: "Node.js is fun!" },
  { id: 3, user: "Pikachu", text: "Let's build a live chat!" },
];

export const list = (req, res) => {
  const user = req.query.user;

  const filteredMessages = user
    ? messages.filter(
        (message) => message.user.toLowerCase() === user.toLowerCase(),
      )
    : messages;

  res.json({
    status: "success",
    data: { messages: filteredMessages },
  });
};

export const get = (req, res) => {
  const message = messages.find(
    (message) => message.id === Number(req.params.id),
  );

  if (!message) {
    return res.status(404).json({
      status: "fail",
      message: "Message not found",
    });
  }

  res.json({
    status: "success",
    data: { message },
  });
};

export const create = (req, res) => {
  const { user, text } = req.body.message || {};

  if (!user || !text) {
    return res.status(400).json({
      status: "fail",
      message: "User and text are required",
    });
  }

  const message = {
    id: messages.length ? Math.max(...messages.map((item) => item.id)) + 1 : 1,
    user,
    text,
  };

  messages.push(message);

  res.status(201).json({
    status: "success",
    data: { message },
  });
};

export const update = (req, res) => {
  const message = messages.find(
    (message) => message.id === Number(req.params.id),
  );

  if (!message) {
    return res.status(404).json({
      status: "fail",
      message: "Message not found",
    });
  }

  const { user, text } = req.body.message || {};

  if (user !== undefined) message.user = user;
  if (text !== undefined) message.text = text;

  res.json({
    status: "success",
    data: { message },
  });
};

export const remove = (req, res) => {
  const index = messages.findIndex(
    (message) => message.id === Number(req.params.id),
  );

  if (index === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Message not found",
    });
  }

  const deletedMessage = messages[index];
  messages.splice(index, 1);

  res.json({
    status: "success",
    data: { message: deletedMessage },
  });
};
