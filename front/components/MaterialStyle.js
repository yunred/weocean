import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export const MainButton = styled(Button)({
  width: '100%',
  background: 'linear-gradient(315deg, #20bf55 0%, #01baef 74%)',
  border: 0,
  color: 'white',
  padding: '5px 30px',
});

export const SubButton = styled(Button)({
  width: '100%',
  background: '#01baef',
  border: 0,
  color: 'white',
  marginBottom: 15,
  borderRadius: 15,
  padding: '5px 30px',
});

export const BasicButton = styled(Button)({
  background: '#01baef',
  border: 0,
  color: 'white',
  marginBottom: 15,
  borderRadius: 5,
  padding: '5px 30px',
});

export const useStyles = makeStyles(() => ({
  closeIconWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: '15px',
    cursor: 'pointer',
    color: 'black',
  },
  close: {
    lineHeight: '14px',
  },
}));
