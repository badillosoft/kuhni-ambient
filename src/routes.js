import Home from "./components/Home/Home";
import Hello from "./components/Hello/Hello";
import Tuto1 from "./components/Tutorial/Tuto1";
import Tuto2 from "./components/Tutorial/Tuto2";
import Tuto3 from "./components/Tutorial/Tuto3";
import Tuto4 from "./components/Tutorial/Tuto4";
import Tuto5p1 from "./components/Tutorial/Tuto5p1";
import Tuto5p2 from "./components/Tutorial/Tuto5p2";
import UserForm from "./components/UserForm/UserForm";
import UserInfo from "./components/UserInfo/UserInfo";
import Tuto5p3 from "./components/Tutorial/Tuto5p3";

export default {
  "#": Home,
  "#home": Home,
  "#hello": Hello,
  "#tutorial-1": Tuto1,
  "#tutorial-2": Tuto2,
  "#tutorial-3": Tuto3,
  "#tutorial-4": Tuto4,
  "#tutorial-5": [Tuto5p1, UserForm, Tuto5p2, UserInfo, Tuto5p3]
};
