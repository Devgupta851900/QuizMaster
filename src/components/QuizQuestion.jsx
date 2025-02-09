import React, { useState } from "react";

export default function QuizQuestion({
	question,
	onAnswer,
	nextQuestion,
	completeQuiz,
}) {
	const [selectedOption, setSelectedOption] = useState(null);

	const handleRadioChange = (e) => {
		setSelectedOption(Number(e.target.value));
	};

	const handleSubmit = () => {
		if (selectedOption !== null) {
			onAnswer(question.id, selectedOption);
			setSelectedOption(null);
		}
	};

	const handleClear = () => {
		setSelectedOption(null);
	};

	return (
		<div className="w-[70vw] h-screen max-h-[400px] flex flex-col">
			{/* Main Content */}
			<div className="flex flex-1 overflow-hidden">
				<button
					onClick={completeQuiz}
					className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition mr-4"
				>
					Finish
				</button>
				{/* Left Section - Question Content */}
				<div className="w-3/5 p-6 border-r flex flex-col justify-between">
					<div className="mb-6">
						<h2 className="text-xl font-semibold mb-4">
							{question.description}
						</h2>
					</div>
					<div className="space-y-4">
						<div className="flex gap-4">
							<button
								onClick={nextQuestion}
								className="flex-1 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
							>
								Next
							</button>
							<button
								onClick={handleSubmit}
								disabled={selectedOption === null}
								className={`flex-1 px-4 py-2 rounded-lg ${
									selectedOption === null
										? "bg-gray-300 cursor-not-allowed"
										: "bg-blue-600 hover:bg-blue-700 text-white"
								} transition`}
							>
								Submit Answer and Next
							</button>
						</div>
					</div>
				</div>

				{/* Right Section - Controls */}
				<div className="w-2/5 p-6 bg-gray-50 flex flex-col justify-between">
					<div className="space-y-4">
						{question.options.map((option) => (
							<label
								key={option.id}
								className={`flex items-start space-x-3 p-3 rounded-lg transition-all ${
									selectedOption === option.id
										? "bg-blue-100 border-2 border-blue-500 scale-105"
										: "hover:bg-gray-100 hover:scale-[1.02]"
								} shadow-sm cursor-pointer`}
							>
								<div
									className={`mt-1 h-5 w-5 rounded-full border-2 flex items-center justify-center ${
										selectedOption === option.id
											? "border-blue-500 bg-blue-500"
											: "border-gray-400"
									}`}
								>
									{selectedOption === option.id && (
										<div className="h-2 w-2 bg-white rounded-full"></div>
									)}
								</div>
								<input
									type="radio"
									name="question-option"
									value={option.id}
									checked={selectedOption === option.id}
									onChange={handleRadioChange}
									className="mt-1 hidden"
								/>
								<span className="text-gray-700">
									{option.description}
								</span>
							</label>
						))}
					</div>
					<button
						onClick={handleClear}
						className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
					>
						Clear Response
					</button>
				</div>
			</div>
		</div>
	);
}
