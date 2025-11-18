using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace medical_record_system_backend.Migrations
{
    /// <inheritdoc />
    public partial class AddFileTypeAndDisplayName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "MedicalFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "FileType",
                table: "MedicalFiles",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "MedicalFiles");

            migrationBuilder.DropColumn(
                name: "FileType",
                table: "MedicalFiles");
        }
    }
}
