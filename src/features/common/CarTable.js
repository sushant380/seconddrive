import React from 'react';
import PropTypes from 'prop-types';
import { } from './redux/hooks';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';

import TableRow from '@material-ui/core/TableRow';
import {connect} from 'react-redux';
import {Chip} from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  squereChip: {
    borderRadius: 0,
  },
});


const columns = [
  {id: '_id', minWidth: 170},
  {id: 'model', label: 'Model', minWidth: 170},
  {id: 'make', label: 'Make', minWidth: 100},
  {
    id: 'licensed',
    label: 'Licensed',
    minWidth: 170,
    format: (value, classes) => value ?
      <Chip
        className={classes.squereChip}
        label="Licensed"
        color="secondary"
      /> :
      <Chip
        className={classes.squereChip}
        label="Not licensed"
      />,
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,

  },
  {
    id: 'dateAdded',
    label: 'Date Added',
    minWidth: 170,

  },
];
const CarTable = (props) => {
  const classes = useStyles();
  const {searchList} = props;

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{minWidth: column.minWidth}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {searchList && searchList.vehicles && searchList.vehicles.map((row) => {
              return (
                <TableRow hover tabIndex={-1} key={row.id} onClick={() => {
                  window.location.assign(`/vehicle?id=${row._id}`);
                }}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      column.id === '_id' ?
                        <TableCell key={column.id} align={column.align}>
                          <img alt="" width={120}
                            src="https://i2.wp.com/authenticautosales.com/wp-content/uploads/2020/03/nocarimage.jpg" />
                        </TableCell> :
                        <TableCell key={column.id} align={column.align}>
                          {column.format && (typeof value === 'number' ||
                            typeof value === 'boolean') ? column.format(value, classes) : value}
                        </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

CarTable.propTypes = {
  searchList: PropTypes.arrayOf(Object).isRequired,
};
CarTable.defaultProps = {
  searchList: [],
};
const mapStateToProps = (state) => {
  return {
    searchList: state.common.searchList,
  };
};

export default connect(mapStateToProps)(CarTable);
