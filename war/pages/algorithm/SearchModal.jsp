

<!-- Search Modal -->
<div class="modal fade" id="searchModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="searchModal-title">Search algorithm</h4>
      </div>
      <div class="modal-body">
      	<p class="errorStatus" id="search-error" style="display:none;"> error </p>
		<div class="form-group dv-search-input">
			<input type="number" id="searchIP1" class="form-control" placeholder="Number 1" style="width: 15%; margin-left: 1%; display: inline;" autofocus="" autocomplete="off">
			<input type="number" id="searchIP2" class="form-control" placeholder="Number 2" style="width: 15%; margin-left: 1%; display: inline;" autofocus="" autocomplete="off">
			<input type="number" id="searchIP3" class="form-control" placeholder="Number 3" style="width: 15%; margin-left: 1%; display: inline;" autofocus="" autocomplete="off">
			<input type="number" id="searchIP4" class="form-control" placeholder="Number 4" style="width: 15%; margin-left: 1%; display: inline;" autofocus="" autocomplete="off">
			<input type="number" id="searchIP5" class="form-control" placeholder="Number 5" style="width: 15%; margin-left: 1%; display: inline;" autofocus="" autocomplete="off">
			<input type="number" id="searchIP6" class="form-control" placeholder="Number 6" style="width: 15%; margin-left: 1%; display: inline;" autofocus="" autocomplete="off">
		</div>
		<div class="form-group dv-search-input">
			<input type="number" id="searchItem" class="form-control" placeholder="Search item" style="width: 20%; margin-left: 40%;" autofocus="" autocomplete="off">
		</div>
        <div style="text-align: center;">
        	<canvas id="searchCanvas" width="700" height="500" style="display:none;border:1px solid #c3c3c3;"></canvas>
        </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button id="search-Simulate" type="button" class="btn btn-primary">Simulate</button>
      </div>
    </div>
  </div>
</div>