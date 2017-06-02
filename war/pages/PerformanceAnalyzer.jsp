<!-- Performance Analyzer QUIZ-->
<div class="modal fade" id="performanceAnalyzerModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document" style="width:800px;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="performanceAnalyzerModal-title">Algorithm</h4>
      </div>
      <div class="modal-body">
      	<p class="errorStatus" id="performanceAnalyzer-error" style="display:none;"> error </p>
      	<div style="text-align: center; margin-top: 15px; font-size: 25px;">
      		<span id="loader" style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span>
      	</div>
		<div class="form-group" id="question-desc">
			<label> <span>1.</span> Question question question question question ?</label> <br>
			<input type="radio" name="options" value="option1" /> <span id="option1">1</span> <br>
			<input type="radio" name="options" value="option2" /> <span id="option2">2</span> <br>
			<input type="radio" name="options" value="option3" /> <span id="option3">3</span> <br>
			<input type="radio" name="options" value="option4" /> <span id="option4">4</span> <br>
		</div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
        <button id="nextQuestion" type="button" class="btn btn-primary" onclick="displayQuizQuestion();">Next <span style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span></button>
      </div>
    </div>
  </div>
</div>




<!-- Performance Details SCORE-->
<div class="modal fade" id="scoreModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document" style="width:600px;">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="scoreModal-title">Performance Details</h4>
      </div>
      <div class="modal-body">
      	<div style="text-align: center; margin-top: 15px; font-size: 25px;">
      		<span id="loader" style="display:none;"> <i class="fa fa-spinner fa-spin"></i> </span>
      	</div>
		<div id="dvScoreDetails" style="margin-left: 32.5%;">
			<table width="50%" border="1.0">
				<thead>
					<tr>
						<th style="text-align: center;">ConceptName</th>
						<th style="text-align: center;">Score</th>
					</tr>
				</thead>
				
				<tbody>
				</tbody>
			</table>
		</div>
		<div id="dvNo-data">
			<p style="text-align: center;"> No data to display! Please look back after attending the test.</p>
		</div>
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>