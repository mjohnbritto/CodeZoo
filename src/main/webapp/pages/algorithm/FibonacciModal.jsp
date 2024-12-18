

<!-- Fibonacci Modal -->
<div class="modal fade" id="fibonacciModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="fibonacciModal-title">Fibonacci algorithm</h4>
      </div>
      <div class="modal-body">
      	<p class="errorStatus" id="fibonacci-error" style="display:none;"> error </p>
		<div class="form-group dv-fibonacci-input">
			<input type="number" id="fibonacciIP1" class="form-control" placeholder="Number 1" disabled style="width: 40%; margin-left: 30%;" autofocus="" autocomplete="off">
		</div>
		<div class="form-group dv-fibonacci-input">
			<input type="number" id="fibonacciIP2" class="form-control" placeholder="Number 2" disabled style="width: 40%; margin-left: 30%;" autofocus="" autocomplete="off">
		</div>
        <div style="text-align: center;">
        	<canvas id="fibonacciCanvas" width="700" height="500" style="display:none;border:1px solid #c3c3c3;"></canvas>
        </div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button id="fibonacci-Simulate" type="button" class="btn btn-primary">Simulate</button>
      </div>
    </div>
  </div>
</div>