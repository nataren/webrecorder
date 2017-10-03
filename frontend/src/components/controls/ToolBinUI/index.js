import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { SizeCounter } from 'containers';


function ToolBinUI(props, context) {
  const { activeBrowser, bookmarkCount, collSize, open } = props;
  const { currMode } = context;
  const classes = classNames('container-fluid wr-tools', { open });
  const isReplay = (currMode === 'replay' || currMode === 'replay-coll');

  return (
    <div className={classes}>
      {
        isReplay &&
          <div>
            <strong>collection info:</strong>
            <span className="left-buffer bookmark-count">{`${bookmarkCount} bookmark${bookmarkCount === 1 ? '' : 's'}`}</span>
            <span className="size-counter size-counter-active">
              <SizeCounter
                bytes={collSize}
                classes="left-buffer-md" />
            </span>
          </div>
      }
      {
        isReplay &&
          <span className="wr-divider" />
      }
      <button id="autoscroll" type="button" className="btn btn-default btn-xs" data-toggle="button" aria-pressed="false">Autoscroll</button>
      {
        /* TODO: condensed share widget */
        (currMode === 'recorder' || currMode === 'patch') &&
          <span />
      }
      {
        activeBrowser &&
          <textarea id="clipboard" />
      }
    </div>
  );
}

ToolBinUI.propTypes = {
  activeBrowser: PropTypes.string,
  open: PropTypes.bool,
  collSize: PropTypes.number,
  bookmarkCount: PropTypes.number
};

ToolBinUI.contextTypes = {
  currMode: PropTypes.string
};

export default ToolBinUI;
