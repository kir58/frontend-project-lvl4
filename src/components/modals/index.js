import AddChannel from './AddChannel.jsx';
import Remove from './RemoveChannel.jsx';
import Rename from './RenameChannel.jsx';

const modals = {
  adding: AddChannel,
  removing: Remove,
  renaming: Rename,
};

export default (modalName) => modals[modalName];
