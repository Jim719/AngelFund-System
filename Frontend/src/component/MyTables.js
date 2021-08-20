import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  content: {
    width: '1025px',
    backgroundColor: '#EFB28C'
  }
});




export const Project_Data_Tbl = ({ tableData }) => {
  const classes = useStyles();
  return (
    <div >
      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell component="th" scope="row" align="right">專案名稱</StyledTableCell>
              <StyledTableCell component="th" scope="row" align="right">專案敘述</StyledTableCell>
              <StyledTableCell component="th" scope="row" align="right">專案截止日</StyledTableCell>
              <StyledTableCell component="th" scope="row" align="right">專案金額</StyledTableCell>
              <StyledTableCell component="th" scope="row" align="right">專案利率</StyledTableCell>              
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map(Data => (
              <StyledTableRow key={Data[0]}>
                {/* <TableCell component="th" scope="row" align="right">{Data.user_id}</TableCell> */}
                <TableCell align="right">{Data[2]}</TableCell>
                <TableCell align="right">{Data[3]}</TableCell>
                <TableCell align="right">{Data[4]}</TableCell>
                <TableCell align="right">{Data[5]}</TableCell>
                <TableCell align="right">{Data[6]}</TableCell>
               
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export const InvestData_Tbl = ({ tableData }) => {
  const classes = useStyles();
  return (
    <div >
      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <StyledTableCell component="th" scope="row" align="right">投資期間</StyledTableCell>
            <StyledTableCell component="th" scope="row" align="right">投資金額</StyledTableCell>
            <StyledTableCell component="th" scope="row" align="right">投資利息</StyledTableCell>            
          </TableHead>
          <TableBody>
            {tableData.map(Data => (
              <StyledTableRow key={Data.Name}>
                {/* <TableCell component="th" scope="row" align="right">{Data.Name}</TableCell> */}
                <TableCell align="right">{Data[2]}</TableCell>
                <TableCell align="right">{Data[3]}</TableCell>
                <TableCell align="right">{Data[4]}</TableCell>
                
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export const MatchingProjectData_Tbl = ({ tableHead, tableData }) => {
  const classes = useStyles();
  return (
    <div >
      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {tableHead.map(item => (
                <StyledTableCell align="right">
                  {item.Headname}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map(Data => (
              <StyledTableRow key={Data.Name}>
                <TableCell component="th" scope="row" align="right">{Data.Name}</TableCell>
                <TableCell align="right">{Data.phone}</TableCell>
                <TableCell align="right">{Data.info}</TableCell>
                {/* <TableCell align="right">{Data.money}</TableCell> */}
                <TableCell align="right">hello</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export const MatchingInvestData_Tbl = ({ tableHead, tableData }) => {
  const classes = useStyles();
  return (
    <div >
      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              {tableHead.map(item => (
                <StyledTableCell align="right">
                  {item.Headname}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map(Data => (
              <StyledTableRow key={Data.Name}>
                <TableCell component="th" scope="row" align="right">{Data.Name}</TableCell>
                <TableCell align="right">{Data.phone}</TableCell>
                <TableCell align="right">{Data.info}</TableCell>
                {/* <TableCell align="right">{Data.money}</TableCell> */}
                <TableCell align="right">hello</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
