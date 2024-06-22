import { useSelector, useDispatch } from 'react-redux';
import { counterActions } from '../store/counter';
import "./Main.scss";
import Button from '@mui/material/Button';

interface MainProps {

}

const Main = (props: MainProps) => {
  const dispatch = useDispatch();
  const counter = useSelector((state: any) => state.counter.counter);

  return <div>
    <h1 className='green' onClick={() => dispatch(counterActions.increase(3))}>line</h1>
    <Button variant="contained" onClick={() => dispatch(counterActions.decrement())}>Text</Button>
    <h2>{counter}</h2>
  </div>
}

export default Main